# file-renamer

Renaming a large number of files is hard, is not it?

Is there something you wanted to fix with a familiar editor?

With this tool you can replace large numbers of file names in bulk.

## How to use

1. node file - renamer.js

1. Since the editor starts (the first time), enter the target directory in the second line.

1. Please exit the editor after input.

1. Since the editor starts up (the second time), correct the file name you want to change.

1. Please exit the editor after input.

1. The file is renamed.

## Configuration

- How do I change the editor to use?

  Correct the setting.json "editor".

  For an asynchronously executed editor, please give the option to wait for the end.

- To change the initial value of the change target directory

  Correct the "default_target" of setting.json.