// Components
import { generateAuthToken } from '../../components/generate'
import '../../components/template'

describe('Wardrobe API Testing - Clothes', () => {
    const method = 'post'
    const token = generateAuthToken("hardcode")

    it('Post History Clothes', () => {
        const payload = {
            clothes_id : '10bacb64-e819-11ed-a05b-0242ac120003',
            clothes_note : 'jangan lupa rendam',
            used_context : 'Shopping',
        }
        
        cy.request({
            method: method,
            url: '/api/v1/clothes/history',
            body: payload,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as('PostHistoryClothes')
        cy.get('@PostHistoryClothes').then(dt => {
            cy.templatePost(dt,null)
            expect(dt.body.message).contain('clothes history created')
        })
    })

    it('Post Schedule', () => {
        const payload = {
            clothes_id : '10bacb64-e819-11ed-a05b-0242ac120003',
            day : 'Wed',
            schedule_note : 'test',
            is_remind : 1,
        }
        
        cy.request({
            method: method,
            url: '/api/v1/clothes/schedule',
            body: payload,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as('PostSchedule')
        cy.get('@PostSchedule').then(dt => {
            cy.templatePost(dt,null)
            expect(dt.body.message).contain('schedule created')
        })
    })

    it('Post Save Outfit History', () => {
        const payload = {
            outfit_id : '05d6fe1d-9041-5673-044b-4d2e7f6f0090',
            used_context : 'Work'
        }
        
        cy.request({
            method: method,
            url: '/api/v1/clothes/outfit/history/save',
            body: payload,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as('PostSaveOutfitHistory')
        cy.get('@PostSaveOutfitHistory').then(dt => {
            cy.templatePost(dt,null)
            expect(dt.body.message).contain('outfit history created with')
        })
    })
})