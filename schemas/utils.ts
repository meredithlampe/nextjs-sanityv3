import { defineArrayMember } from "sanity";

export const ALL_SECTION_TYPES = [
    defineArrayMember({
        type: 'blockText',
    }),
    defineArrayMember({
        type: 'fullBleedImage',
    }),
]