// Components
import { generateAuthToken } from '../../components/generate'
import '../../components/template'

describe('Wardrobe API Testing - Clothes', () => {
    const method = 'delete'
    const token = generateAuthToken("hardcode")

    it('Soft Delete Clothes By Id', () => {
        const id = '17963858-9771-11ee-8f4a-32164291er4w' 
        
        cy.request({
            method: method,
            url: `/api/v1/clothes/delete/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as('SoftDeleteClothesById')
        cy.get('@SoftDeleteClothesById').then(dt => {
            cy.templateDelete(dt)
            expect(dt.body.message).contain('clothes deleted')
        })
    })

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

    it('Hard Delete Schedule By Id', () => {
        const id = '17963858-9771-11ee-8f4a-32164291er4w' 
        
        cy.request({
            method: method,
            url: `/api/v1/clothes/destroy_schedule/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as('HardDeleteScheduleById')
        cy.get('@HardDeleteScheduleById').then(dt => {
            cy.templateDelete(dt)
            expect(dt.body.message).contain('schedule permentally deleted')
        })
    })

    it('Hard Delete Wash By Id', () => {
        const id = '17963858-9771-11ee-8f4a-32164291er4w' 
        
        cy.request({
            method: method,
            url: `/api/v1/clothes/destroy_wash/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as('HardDeleteWashById')
        cy.get('@HardDeleteWashById').then(dt => {
            cy.templateDelete(dt)
            expect(dt.body.message).contain('clothes wash permentally deleted')
        })
    })
})