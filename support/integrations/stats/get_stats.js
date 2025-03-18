// Components
import { generateAuthToken } from '../../components/generate'
import '../../components/template'

describe('Wardrobe Integration Test - Stats', () => {
    const is_paginate = false
    const token = generateAuthToken("hardcode")

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
            const intFelds = ['total']

            // Validate column
            cy.templateValidateColumn(dataArr, stringFields, 'string', false)
            cy.templateValidateColumn(dataArr, intFelds, 'number', false)

            // Validate character length
            // Context : clothes_merk
            const columnProps = [
                { column_name : 'context', data_type: 'string', max: 75, min: 1, nullable: false },
                { column_name : 'total', data_type: 'number', max: null, min: 0, nullable: false },
            ]
            cy.templateValidateMaxMin(dataArr, columnProps)
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

            // Validate character length
            const columnProps = [
                { column_name : 'feedback_body', data_type: 'string', max: 144, min: 1, nullable: false },
                { column_name : 'username', data_type: 'string', max: 36, min: 1, nullable: false },
                { column_name : 'feedback_rate', data_type: 'number', max: 5, min: 1, nullable: false },
            ]
            cy.templateValidateMaxMin(dataArr, columnProps)

            // Validate datetime
            const columnDateTime = [
                { column_name : 'created_at', date_type: 'datetime', nullable: false }
            ]
            cy.templateValidateDateTime(dataArr, columnDateTime)
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

            // Validate character length
            const columnProps = [
                { column_name : 'total_clothes', data_type: 'number', max: null, min: 0, nullable: false },
                { column_name : 'total_user', data_type: 'number', max: null, min: 0, nullable: false },
                { column_name : 'total_schedule', data_type: 'number', max: null, min: 0, nullable: false },
                { column_name : 'total_outfit_decision', data_type: 'number', max: null, min: 0, nullable: false },
            ]
            cy.templateValidateMaxMin(dataObj, columnProps)
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

            // Validate character length
            const columnProps = [
                { column_name : 'total_created', data_type: 'number', max: null, min: 0, nullable: false },
                { column_name : 'total_buyed', data_type: 'number', max: null, min: 0, nullable: false },
            ]
            cy.templateValidateMaxMin(dataArr, columnProps)
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

            // Contain validation
            const monthName = ['January','February','March','April','May','June','July','August','September','October','November','December']
            cy.templateValidateContain(dataArr,monthName,'context')

            // Validate character length
            const columnProps = [
                { column_name : 'total', data_type: 'number', max: null, min: 0, nullable: false },
            ]
            cy.templateValidateMaxMin(dataArr, columnProps)
        })
    })

    it('Get Stats Outfit Yearly Most Used', () => {
        const year = 2025

        cy.request({
            method: 'get',
            url: `/api/v1/stats/outfit/most/used/${year}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as('GetStatsOutfitYearlyMostUsed')
        cy.get('@GetStatsOutfitYearlyMostUsed').then(dt => {
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

            // Validate character length
            // context : outfit_name
            const columnProps = [
                { column_name : 'context', data_type: 'string', max: 36, min: 1, nullable: false },
                { column_name : 'total', data_type: 'number', max: null, min: 0, nullable: false },
            ]
            cy.templateValidateMaxMin(dataArr, columnProps)
        })
    })

    it('Get Stats Wash Summary', () => {
        cy.request({
            method: 'get',
            url: `/api/v1/stats/wash/summary`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as('GetStatsWashSummary')
        cy.get('@GetStatsWashSummary').then(dt => {
            cy.templateGet(200,dt, null)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataObj = resultItem.data
            expect(dataObj).to.be.an('object')

            // Get list key / column
            const stringFields = ['last_wash_clothes','last_wash_date','most_wash']
            const intFields = ['total_wash','avg_wash_dur_per_clothes','avg_wash_per_week']

            // Validate column
            cy.templateValidateColumn(dataObj, stringFields, 'string', false)
            cy.templateValidateColumn(dataObj, intFields, 'number', false)

            // Validate character length
            // most_wash, last_wash_clothes : clothes_name
            const columnProps = [
                { column_name : 'last_wash_clothes', data_type: 'string', max: 75, min: 1, nullable: true },
                { column_name : 'most_wash', data_type: 'string', max: 75, min: 1, nullable: true },
                { column_name : 'total_wash', data_type: 'number', max: null, min: 0, nullable: false },
                { column_name : 'avg_wash_dur_per_clothes', data_type: 'number', max: null, min: 0, nullable: false },
                { column_name : 'avg_wash_per_week', data_type: 'number', max: null, min: 0, nullable: false },
            ]
            cy.templateValidateMaxMin(dataObj, columnProps)
        })
    })
})