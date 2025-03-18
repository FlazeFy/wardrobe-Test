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

    it('Post Wash Clothes', () => {
        const payload = {
            clothes_id : '10bacb64-e819-11ed-a05b-0242ac120003',
            wash_note : 'test',
            wash_type : 'Laundry',
            wash_checkpoint : {
                id : 1,
                checkpoint_name : "rendam",
                is_finished : false
            },
        }
        
        cy.request({
            method: method,
            url: '/api/v1/clothes/wash',
            body: payload,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as('PostWashClothes')
        cy.get('@PostWashClothes').then(dt => {
            cy.templatePost(dt,null)
            expect(dt.body.message).contain('clothes wash history created')
        })
    })

    it('Post Save Outfit', () => {
        const payload = {
            list_outfit : [
                {
                    data : [
                        {
                            id : 'efbf49d9-78f4-436a-07ef-ca3aa661f9d7',
                            clothes_name : 'shirt A',
                            clothes_category : 'head',
                            clothes_type : 'hat',
                            clothes_merk : 'Nike',
                            clothes_made_from : 'cotton',
                            clothes_color : 'blue',
                            clothes_image : 'https://storage.googleapis.com',
                            last_used : '2025-01-11 11:09:18',
                            total_used : 2,
                        },
                    ],
                    created_at : '2025-01-17T03:35:56.340Z',
                    outfit_name : 'Outfit Generated 17-Jan-2025 10:35',
                },
            ]
        }
        
        cy.request({
            method: method,
            url: '/api/v1/clothes/wash',
            body: payload,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as('PostSaveOutfit')
        cy.get('@PostSaveOutfit').then(dt => {
            cy.templatePost(dt,null)
            expect(dt.body.message).contain('clothes wash history created')
        })
    })

    it('Post Clothes', () => {
        const payload = {
            clothes_name: 'Clothes A',
            clothes_category: 'upper_body',
            clothes_desc: 'A stylish casual outfit',
            clothes_merk: 'BrandX',
            clothes_color: 'blue',
            clothes_price: 500000,
            clothes_image: null,
            clothes_size: 'M',
            clothes_gender: 'unisex',
            clothes_made_from: 'cotton',
            clothes_type: 'shirt',
            clothes_buy_at: '2024-07-15',
            clothes_qty: 1,
            is_faded: 0,
            has_washed: 1,
            has_ironed: 1,
            is_favorite: 0
        }
        
        cy.request({
            method: method,
            url: '/api/v1/clothes',
            body: payload,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as('PostClothes')
        cy.get('@PostClothes').then(dt => {
            cy.templatePost(dt,null)
            expect(dt.body.message).contain('clothes created, its called')
        })
    })
})