// Components
import { generateAuthToken } from '../../components/generate'
import '../../components/template'

describe('Wardrobe API Testing - Dictionary', () => {
    const method = 'post'
    const token = generateAuthToken("hardcode")

    it('Post Dictionary', () => {
        const payload = {
            dictionary_type : "used_context",
            dictionary_name : "testing"
        }
        
        cy.request({
            method: method,
            url: '/api/v1/dct',
            body: payload,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as('PostDictionary')
        cy.get('@PostDictionary').then(dt => {
            cy.templatePost(dt,null)
            expect(dt.body.message).contain('dictionary created')
        })
    })
})