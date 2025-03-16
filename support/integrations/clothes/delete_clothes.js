// Components
import { generateAuthToken } from '../../components/generate'
import '../../components/template'

describe('Wardrobe API Testing - Clothes', () => {
    const method = 'delete'
    const token = generateAuthToken("hardcode")

    it('Hard Delete Clothes By Id', () => {
        const id = '17963858-9771-11ee-8f4a-32164291er4w' 
        
        cy.request({
            method: method,
            url: `/api/v1/clothes/destroy/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as('HardDeleteClothesById')
        cy.get('@HardDeleteClothesById').then(dt => {
            cy.templateDelete(dt)
            expect(dt.body.message).contain('clothes permentally deleted')
        })
    })
})