import { writeFile } from 'fs/promises';
import genSidebar, {
  checkIfDirectoryFile,
  convertSidebarToParsable,
  flattenSidebar,
  orderSidebar,
} from './sidebar.mjs';

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
