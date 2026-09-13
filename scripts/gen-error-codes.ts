import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const OPENAPI_PATH = './public/openapi.json';
const OUTPUT_PATH = './content/docs/api/(generated)/error-codes.mdx';
const META_PATH = './content/docs/api/(generated)/meta.json';

type ErrorCode = {
  code: number;
  message: string;
  statusCode: number;
};

type Category = {
  description: string;
  max: number;
  min: number;
  title: string;
};

const categories: Category[] = [
  {
    min: 1000,
    max: 1999,
    title: 'Validation and client errors',
    description: 'The request was malformed or contained invalid data.',
  },
  {
    min: 2000,
    max: 2999,
    title: 'Session and authentication errors',
    description: 'The request was not authenticated or the session is invalid.',
  },
  {
    min: 3000,
    max: 3999,
    title: 'Permission errors',
    description: 'The authenticated user does not have permission to perform the operation.',
  },
  {
    min: 4000,
    max: 4999,
    title: 'Not found errors',
    description: 'The requested resource does not exist.',
  },
  {
    min: 5000,
    max: 5999,
    title: 'Constraint errors',
    description: 'The request exceeded a configured size, quota, or other limit.',
  },
  {
    min: 6000,
    max: 6999,
    title: 'Internal errors',
    description: 'The server could not complete the operation.',
  },
  {
    min: 9000,
    max: 9999,
    title: 'Generic errors',
    description: 'Fallback errors used when a more specific code is not available.',
  },
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseErrorExample(value: unknown): ErrorCode | undefined {
  if (!isRecord(value)) return;

  const { code, error, statusCode } = value;
  if (!Number.isInteger(code) || typeof error !== 'string' || !Number.isInteger(statusCode)) return;

  const prefix = `E${code}: `;
  return {
    code: code as number,
    message: error.startsWith(prefix) ? error.slice(prefix.length) : error,
    statusCode: statusCode as number,
  };
}

function collectErrorCodes(document: unknown): ErrorCode[] {
  const examples = new Map<number, ErrorCode>();
  const declaredCodes = new Set<number>();

  function visit(value: unknown) {
    if (Array.isArray(value)) {
      for (const item of value) visit(item);
      return;
    }
    if (!isRecord(value)) return;

    if (isRecord(value.properties) && isRecord(value.properties.code)) {
      const codeEnum = value.properties.code.enum;
      if (Array.isArray(codeEnum)) {
        for (const code of codeEnum) {
          if (Number.isInteger(code)) declaredCodes.add(code as number);
        }
      }
    }

    if (isRecord(value.examples)) {
      for (const example of Object.values(value.examples)) {
        if (!isRecord(example)) continue;
        const parsed = parseErrorExample(example.value);
        if (!parsed) continue;

        const existing = examples.get(parsed.code);
        if (existing && (existing.message !== parsed.message || existing.statusCode !== parsed.statusCode)) {
          throw new Error(`Conflicting OpenAPI examples found for error code E${parsed.code}`);
        }
        examples.set(parsed.code, parsed);
      }
    }

    for (const child of Object.values(value)) visit(child);
  }

  visit(document);

  const missingExamples = [...declaredCodes].filter((code) => !examples.has(code)).sort((a, b) => a - b);
  if (missingExamples.length > 0) {
    throw new Error(
      `OpenAPI error codes are missing examples: ${missingExamples.map((code) => `E${code}`).join(', ')}`,
    );
  }
  if (examples.size === 0) throw new Error('No error code examples were found in the OpenAPI document');

  return [...examples.values()].sort((a, b) => a.code - b.code);
}

function escapeTableCell(value: string) {
  return value.replaceAll('\\', '\\\\').replaceAll('|', '\\|').replaceAll('\n', '<br />');
}

function renderTable(errors: ErrorCode[]) {
  const rows = errors.map(
    ({ code, message, statusCode }) => `| \`E${code}\` | \`${statusCode}\` | ${escapeTableCell(message)} |`,
  );

  return ['| Code | HTTP status | Message |', '| --- | --- | --- |', ...rows].join('\n');
}

function renderPage(errors: ErrorCode[]) {
  const sections = categories.flatMap((category) => {
    const categoryErrors = errors.filter(({ code }) => code >= category.min && code <= category.max);
    if (categoryErrors.length === 0) return [];

    return [`## ${category.title}`, category.description, renderTable(categoryErrors)];
  });

  const categorizedCodes = new Set(
    categories.flatMap(({ min, max }) =>
      errors.filter(({ code }) => code >= min && code <= max).map(({ code }) => code),
    ),
  );
  const uncategorized = errors.filter(({ code }) => !categorizedCodes.has(code));
  if (uncategorized.length > 0) {
    sections.push('## Other errors', renderTable(uncategorized));
  }

  return [
    '---',
    'title: Error Codes',
    'description: Complete reference of Zipline API error codes and their HTTP statuses',
    '---',
    '',
    '{/* This file is generated by `pnpm gen:error-codes`. Do not edit it directly. */}',
    '',
    `This page lists all ${errors.length} error codes defined by the current OpenAPI schema. Use the numeric code for programmatic error handling rather than parsing the error message.`,
    '',
    ...sections.flatMap((section) => [section, '']),
  ].join('\n');
}

async function updateGeneratedMeta() {
  let meta: Record<string, unknown> = {};
  try {
    const parsed: unknown = JSON.parse(await readFile(META_PATH, 'utf8'));
    if (isRecord(parsed)) meta = parsed;
  } catch (error) {
    if (!isRecord(error) || error.code !== 'ENOENT') throw error;
  }

  const pages = Array.isArray(meta.pages)
    ? meta.pages.filter((page): page is string => typeof page === 'string' && page !== 'error-codes')
    : [];
  meta.pages = ['error-codes', ...pages];

  await writeFile(META_PATH, `${JSON.stringify(meta, null, 2)}\n`);
}

export async function generateErrorCodeDocs() {
  const document: unknown = JSON.parse(await readFile(OPENAPI_PATH, 'utf8'));
  const errors = collectErrorCodes(document);

  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await Promise.all([writeFile(OUTPUT_PATH, renderPage(errors)), updateGeneratedMeta()]);

  console.log(`Generated ${OUTPUT_PATH} with ${errors.length} error codes`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  generateErrorCodeDocs().catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  });
}
