import fs from 'fs-extra'
const dereference = process.platform === 'win32' ? true : undefined

// Copy the PSPDFKit library files to the public folder.
await fs.copy('node_modules/pspdfkit/dist/pspdfkit-lib', 'public/assets/js/pspdfkit-lib/', {
  dereference,
})

// Copy rangy library files to the public folder.
await fs.copy('node_modules/rangy/lib', 'public/assets/js/rangy/', {
  dereference,
  filter: (src: any) => !src.includes('rangy-selectionsaverestore.js') && !src.includes('rangy-textrange,js'),
})
