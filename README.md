# gotosql README

This extension allows the user to navigate to an SQL file in VSCode.

1. Right-click on the line containing the filename, e.g. `myfile.sql` or a string in double quotation marks, e.g. `"my_module"`.
2. Choose `GoTo SQL File`

If there is no sql file under the given name, we'll see an error message.

If there is one sql file with the given name in the workspace, we navigate
to that file.

If there are more than one file with the given name in the workspace,
the file menu will open, prefilled with that filename.

# how do I install this

1. Clone this repo and navigate to the folder.
2. Install npm
3. Run `npm install vsce`
4. Run `vsce package` to build the extension
5. Run `code --install-extension <path-to-vsix-file>`
