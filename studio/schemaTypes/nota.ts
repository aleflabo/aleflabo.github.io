import { defineArrayMember, defineField, defineType } from 'sanity';

// Una nota del sito. I campi italiani sono obbligatori, quelli inglesi no:
// una nota nasce in italiano e può essere tradotta dopo.
//
// Il sito considera una nota «tradotta» solo quando titolo, sommario e corpo
// inglesi ci sono tutti e tre (src/lib/note.ts). Con meno di così la nota
// resta italiana anche su /en/notes, marcata `lang="it"` — quindi tradurre
// solo il titolo non produce una pagina inglese a metà.
export const nota = defineType({
  name: 'nota',
  title: 'Nota',
  type: 'document',
  groups: [
    { name: 'italiano', title: 'Italiano', default: true },
    { name: 'inglese', title: 'Inglese (facoltativo)' },
  ],
  fields: [
    defineField({
      name: 'titolo',
      title: 'Titolo',
      type: 'string',
      group: 'italiano',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Indirizzo',
      description: "La parte finale dell'URL: /note/questa-parte. Una volta pubblicata, cambiarlo rompe i link già in giro.",
      type: 'slug',
      group: 'italiano',
      options: { source: 'titolo', maxLength: 80 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'data',
      title: 'Data',
      type: 'date',
      group: 'italiano',
      options: { dateFormat: 'DD-MM-YYYY' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'sommario',
      title: 'Sommario',
      description: "Una o due frasi. Compare nell'elenco, nel feed RSS e come descrizione per Google e per chi condivide il link.",
      type: 'text',
      rows: 3,
      group: 'italiano',
      validation: (r) => r.required().max(320),
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'array',
      group: 'italiano',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'corpo',
      title: 'Testo',
      type: 'array',
      group: 'italiano',
      validation: (r) => r.required(),
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normale', value: 'normal' },
            { title: 'Titolo di sezione', value: 'h2' },
            { title: 'Sottotitolo', value: 'h3' },
            { title: 'Citazione', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Grassetto', value: 'strong' },
              { title: 'Corsivo', value: 'em' },
              { title: 'Codice', value: 'code' },
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Testo alternativo',
              description: "Che cosa si vede, per chi legge con la sintesi vocale. Lascialo vuoto solo se l'immagine è decorativa.",
              type: 'string',
            }),
            defineField({ name: 'didascalia', title: 'Didascalia', type: 'string' }),
          ],
        }),
      ],
    }),

    defineField({ name: 'titoloEn', title: 'Title', type: 'string', group: 'inglese' }),
    defineField({ name: 'sommarioEn', title: 'Summary', type: 'text', rows: 3, group: 'inglese', validation: (r) => r.max(320) }),
    defineField({
      name: 'corpoEn',
      title: 'Text',
      type: 'array',
      group: 'inglese',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading', value: 'h2' },
            { title: 'Subheading', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
            defineField({ name: 'didascalia', title: 'Caption', type: 'string' }),
          ],
        }),
      ],
    }),
  ],
  orderings: [
    { title: 'Dalla più recente', name: 'dataDesc', by: [{ field: 'data', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'titolo', subtitle: 'data' },
  },
});
