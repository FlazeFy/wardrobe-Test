// Components
import { generateAuthToken, generateDayName, generateRandDate } from '../../components/generate'
import '../../components/template'

describe('Wardrobe API Testing - Stats', () => {
    const is_paginate = false
    const token = generateAuthToken("hardcode")
    const date = generateRandDate()

    it('Get Stats Clothes Most Context', () => {
        const ctx = 'clothes_merk'

        cy.request({
            method: 'post',
            url: `/api/v1/stats/clothes/by/${ctx}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as('PostStatsClothesMostContext')
        cy.get('@PostStatsClothesMostContext').then(dt => {
            cy.templateGet(200,dt, is_paginate)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataArr = resultItem.data
            expect(dataArr).to.be.an('array')

            // Get list key / column
            const stringFields = ['context']
            const intiFelds = ['total']

            // Validate column
            cy.templateValidateColumn(dataArr, stringFields, 'string', false)
            cy.templateValidateColumn(dataArr, intiFelds, 'number', false)
        })
    })

    it('Get Top Feedback', () => {
        cy.request({
            method: 'get',
            url: `/api/v1/stats/feedback/top`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as('GetTopFeedback')
        cy.get('@GetTopFeedback').then(dt => {
            cy.templateGet(200,dt, is_paginate)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataArr = resultItem.data
            expect(dataArr).to.be.an('array')

            // Get list key / column
            const stringFields = ['feedback_body','created_at','username']
            const intFields = ['feedback_rate']

            // Validate column
            cy.templateValidateColumn(dataArr, stringFields, 'string', false)
            cy.templateValidateColumn(dataArr, intFields, 'number', false)
        })
    })

    it('Get All Stats', () => {
        cy.request({
            method: 'get',
            url: `/api/v1/stats/all`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as('GetAllStats')
        cy.get('@GetAllStats').then(dt => {
            cy.templateGet(200,dt, null)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataObj = resultItem.data
            expect(dataObj).to.be.an('object')

            // Get list key / column
            const intFields = ['total_clothes','total_user','total_schedule','total_outfit_decision']

            // Validate column
            cy.templateValidateColumn(dataObj, intFields, 'number', false)
        })
    })

    it('Get Stats Clothes Monthly Created Buyed', () => {
        const year = 2025

        cy.request({
            method: 'get',
            url: `/api/v1/stats/clothes/monthly/created_buyed/${year}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as('GetStatsClothesMonthlyCreatedBuyed')
        cy.get('@GetStatsClothesMonthlyCreatedBuyed').then(dt => {
            cy.templateGet(200,dt, is_paginate)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataArr = resultItem.data
            expect(dataArr).to.be.an('array')

            // Get list key / column
            const stringFields = ['context']
            const intFields = ['total_created','total_buyed']

            // Validate column
            cy.templateValidateColumn(dataArr, stringFields, 'string', false)
            cy.templateValidateColumn(dataArr, intFields, 'number', false)

            // Contain validation
            const monthName = ['January','February','March','April','May','June','July','August','September','October','November','December']
            cy.templateValidateContain(dataArr,monthName,'context')
        })
    })

    it('Get Stats Outfit Monthly By Outfit Id', () => {
        const year = 2025
        const outfit = 'all'

        cy.request({
            method: 'get',
            url: `/api/v1/stats/outfit/monthly/by_outfit/${year}/${outfit}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as('GetStatsOutfitMonthlyByOutfitId')
        cy.get('@GetStatsOutfitMonthlyByOutfitId').then(dt => {
            cy.templateGet(200,dt, is_paginate)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataArr = resultItem.data
            expect(dataArr).to.be.an('array')

            // Get list key / column
            const stringFields = ['context']
            const intFields = ['total']

            // Validate column
            cy.templateValidateColumn(dataArr, stringFields, 'string', false)
            cy.templateValidateColumn(dataArr, intFields, 'number', false)
        })
    })
})