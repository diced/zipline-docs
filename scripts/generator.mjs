import { writeFile } from 'fs/promises';
import genSidebar, {
  checkIfDirectoryFile,
  convertSidebarToParsable,
  orderSidebar,
} from './sidebar.mjs';

export async function generator(context = 'watch') {
  const time = process.hrtime();
  const sidebar = await genSidebar('./docs');

  await writeFile(
    './sidebar.json',
    JSON.stringify(
      convertSidebarToParsable(checkIfDirectoryFile(orderSidebar(sidebar))),
      null,
      2,
    ),
  );

  const diff = process.hrtime(time);

  console.log(
    `[${context}] generated sidebar json in ${Math.floor(diff[1] / 1e6)}ms`,
  );
}
