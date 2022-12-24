import releases from './releases.mjs';
import genSidebar, {
  convertSidebarToParsable,
  checkIfDirectoryFile,
  orderSidebar,
  flattenSidebar,
} from './sidebar.mjs';
import { writeFile } from 'fs/promises';

const sidebar = await genSidebar('./docs');

await writeFile(
  './sidebar.json',
  JSON.stringify(convertSidebarToParsable(checkIfDirectoryFile(orderSidebar(sidebar))), null, 2)
);

await writeFile(
  './sidebarf.json',
  JSON.stringify(
    flattenSidebar(convertSidebarToParsable(checkIfDirectoryFile(orderSidebar(sidebar)))),
    null,
    2
  )
);

console.log('Generated sidebar.json');

await releases();

console.log('Generated release changelogs');
