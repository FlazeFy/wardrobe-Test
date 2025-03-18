// Components
import { generateAuthToken } from '../../components/generate'
import '../../components/template'

describe('Wardrobe Integration Test - Clothes', () => {
    const method = 'put'
    const token = generateAuthToken("hardcode")

    it('Put Recover Clothes By Id', () => {
        const id = '17963858-9771-11ee-8f4a-32164291er4w' 
        
        cy.request({
            method: method,
            url: `/api/v1/clothes/recover/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as('PutRecoverClothesById')
        cy.get('@PutRecoverClothesById').then(dt => {
            cy.templatePut(dt)
            expect(dt.body.message).contain('clothes recover')
        })
    })
})