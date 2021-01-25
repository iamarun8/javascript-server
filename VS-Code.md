
## Features ##
1. Emmet Abbreviations
These useful shortcuts come built-in to VS Code, and they make writing HTML (and CSS) a lot faster.
The general way to write Emmet abbreviation is:
*** tagName[series of expressions] ***
Where tagName: is the HTML tag you want to generate
Series of expressions will govern the markup that will be generated.
Example : div{This is a div} Will generate a div tag with whatever text that is specified inside the curly braces ({}).

2. Transform to Title Case
This feature is very useful when you need to convert a word that starts with a lowercase to a word that starts with an uppercase.
You can actually use a command called Transform to Title Case inside your shortcuts window by binding a custom keyboard shortcut to it.

Open up your Keyboard Shortcuts window by pressing *** Ctrl + S + K (Mac: Command + S + K )*** and bind a keyboard combo for Transform to Title Case.

3. The Integrated CLI (Command Line Interface)
To save switching between windows, VS Code offers an integrated terminal or CLI. Simply, press *** CNTRL + ' or CMD + ' *** to open it up, and the same command to close it. It will automatically open in the directory you have open in VS Code, which saves the navigation step required for operations in a standard terminal.
This makes it easy to install NPM or Yarn dependencies, commit files to Git, and push files to Github — as well as anything else you might want to do via the command line!

4. Fold/Unfold a block of code
Windows: *** Ctrl + Shift + [ or Ctrl + Shift + ] *** Mac: *** Command + Shift + [ or Command + Shift + ] ***

Folding a block of code will help you instantly trim down a code block into one line, which will help you quickly jump between code throughout the current file.


5. Show The Explorer
Windows: *** Ctrl + Shift + E *** Mac: *** Command + Shift + E ***

Sometimes when you have an idea in mind and you want to look at your current directory in a tree structure don't forget that you can show the file explorer in which it displays exactly that. Just press Ctrl + Shift + E (For Mac users it is Command + Shift + E) and the panel will open up on the left side of your screen if it isn't already opened.


6. Find and Open a File
This is arguably one of VS code's top ten features of all time simply because it saves time and stress. Imagine how it would feel like to search for a file using just your mouse? If you're working with a big project, this can be nerve wrecking.

To search for and open up a file you're looking for, the shortcut is  *** Ctrl + T (For Mac users it is Command + T) ***

7. Directly Open Your TypeScript Config
There's two ways to easily make VSCode open up your tsconfig.json. One way is to open up the file finder by pressing *** Ctrl + T (Mac: Command + T) *** and having to type in the letters to narrow down the search results, or you can just easily press a key combination to open it up directly


8. Re-open a recently closed tab
I've been into situations many times where I've closed a batch of tabs, then a minute later I had to look at the same file again. In these situations a way to get back to that file is to travel back in time by hitting the keys *** Ctrl + Shift + T (For Mac: Command + Shift + T) ***.

9. ESLint
ESLint is a powerful and popular linting tool, which helps you spot errors in your code and fix them as you write and which helps you follow common best-practices. It’s also a great learning tool, since researching ESLint errors has taught me many best practices I didn’t know before, and it’s helped me understand why they are best practices.
If you have the ESLint extension installed you can use *** CTRL + SHIFT + P *** to open the Command Palette. Then search for “ESLint fix all auto-fixable Problems” and press enter.


10. Multi-Cursor Shortcuts
The ability to edit with multiple cursors can be a huge time saver. To use this most effectively requires memorisation of a handful of commands, but they’ll soon become second nature.
Windows: *** Ctrl + Alt + Arrow Keys ***
Linux: *** Shift + Alt + Arrow Keys ***
Mac: *** Opt + Cmd + Arrow Keys ***




## plugins ##
1. Quokka
Quokka is a debugging tool that gives live feedback on the code you are writing. It shows you previews of the results of functions and calculated values for variables. The extension is easy to configure and works out of the box with JSX or TypeScript projects.

2. Faker
Quickly insert placeholder data using the popular Faker JavaScript library. You can generate random names, addresses, images, phone numbers, or just paragraphs of classic Lorem Ipsum. Each category has various subcategories so you can make the data fit your needs.

3. CSS Peek
WIth this extension you can trace the definitions of CSS classes and ids in your stylesheets. When you right click on a selector in your HTML files, choosing the options Go to Definition and Peek definition will send you to the CSS code in which you've styled them.

4. HTML Boilerplate
The HTML boilerplate extension will save you from having to manually write the head and body tags of a new HTML document. Just type html in an empty file, hit the Tab key, and a clean document structure will be generated.

5. Color Info
Small plugin that gives you various information about the colors you've used in your CSS. By hovering on a color you can see a larger preview of how it looks, as well as info about its translation to all formats (hex, rgb, hsl, and cmyk).

6. SVG Viewer
This extension adds a number of utilities for working with SVGs in Visual Studio Code. It makes it possible to render SVG files and see how they look like without having to leave the editor. There are also options for converting to PNG and generating data URI schemes.

7. TODO Highlight
This tool marks all TODO comments in your code, making it easier to track down any unfinished business before pushing to production. By default it looks for TODO and FIXME keywords but you can add your custom expressions as well.


8. Regex Previewer
Useful tool for live testing your regular expressions. It works by applying the regex pattern over any text file opened to the side, highlighting all the matches. Kinda like RegExr but right inside your editor!