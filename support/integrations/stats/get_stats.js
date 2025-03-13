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
})