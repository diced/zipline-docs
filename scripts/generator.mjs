import { writeFile } from 'fs/promises';
import genSidebar, {
  checkIfDirectoryFile,
  convertSidebarToParsable,
  flattenSidebar,
  orderSidebar,
} from './sidebar.mjs';

export async function generator(context = 'watch') {
  const time = process.hrtime();
  const sidebar = await genSidebar('./docs');

  const parsableSidebar = convertSidebarToParsable(
    checkIfDirectoryFile(orderSidebar(sidebar)),
  );

  await writeFile('./sidebar.json', JSON.stringify(parsableSidebar, null, 2));

  await writeFile(
    './sidebarf.json',
    JSON.stringify(flattenSidebar(parsableSidebar), null, 2),
  );

  const diff = process.hrtime(time);

  console.log(
    `[${context}] generated sidebar json in ${Math.floor(diff[1] / 1e6)}ms`,
  );
}
