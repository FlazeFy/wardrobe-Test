// Components
import { generateAuthToken } from '../../components/generate'
import '../../components/template'

describe('Wardrobe Integration Test - Feedback', () => {
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

            // Validate character length
            // created_by : username
            const columnProps = [
                { column_name : 'id', data_type: 'string', max: 36, min: 36, nullable: false },
                { column_name : 'created_by', data_type: 'string', max: 36, min: 6, nullable: false },
                { column_name : 'feedback_body', data_type: 'string', max: 144, min: 1, nullable: false },
                { column_name : 'feedback_rate', data_type: 'number', max: 5, min: 1, nullable: false },
            ]
            cy.templateValidateMaxMin(dataArr, columnProps)

            // Validate datetime
            const columnDateTime = [
                { column_name : 'created_at', date_type: 'datetime', nullable: false },
            ]
            cy.templateValidateDateTime(dataArr, columnDateTime)
        })
    })
})