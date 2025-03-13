// Components
import { generateAuthToken } from '../../components/generate'
import '../../components/template'

describe('Wardrobe API Testing - Feedback', () => {
    const is_paginate = true
    const token = generateAuthToken("hardcode_admin")

    it('Get All Feedback', () => {
        cy.request({
            method: 'get',
            url: `/api/v1/feedback`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as('GetAllFeedback')
        cy.get('@GetAllFeedback').then(dt => {
            cy.templateGet(200,dt, is_paginate)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataArr = resultItem.data.data
            expect(dataArr).to.be.an('array')

            // Get list key / column
            const stringFields = ['id','feedback_body', 'created_at', 'created_by']
            const intFields = ['feedback_rate']

            // Validate column
            cy.templateValidateColumn(dataArr, stringFields, 'string', false)
            cy.templateValidateColumn(dataArr, intFields, 'number', false)
        })
    })
})