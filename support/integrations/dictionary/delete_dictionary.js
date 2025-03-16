// Components
import { generateAuthToken } from '../../components/generate'
import '../../components/template'

describe('Wardrobe API Testing - Dictionary', () => {
    const method = 'delete'
    const token = generateAuthToken("hardcode")

    it('Hard Delete Dictionary By Id', () => {
        const id = 'f997d3c3-f78c-46c9-1d95-602b24f29382' 
        
        cy.request({
            method: method,
            url: `/api/v1/dct/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as('HardDeleteDictionaryById')
        cy.get('@HardDeleteDictionaryById').then(dt => {
            cy.templateDelete(dt)
            expect(dt.body.message).contain('dictionary permentally deleted')
        })
    })
})