import Playground from '../../src/components/Playground.js';

# Variables
Variables can be used to customize the text used in embeds. Here is a list of all the variables you can use.

| Notaion | Description |
|---------|-------------|
| `{user.admin}` | outputs yes or no if the user is an administrator |
| `{user.id}` | outputs the id of the user |
| `{user.name}` | outputs the name of the user |
| `{image.id}` | outputs the numeric id of the file |
| `{image.file}` | outputs the file name |
| `{image.mime}` | outputs the mimetype of the file |
| `{image.created_at.full_string}` | outputs the full date |
| `{image.created_at.date_string}` | outputs only the date |
| `{image.created_at.time_string}` | outputs only the time |

## Playground
Type in any variable below to test out the variables.

<Playground />