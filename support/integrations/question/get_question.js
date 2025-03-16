// Components
import { generateAuthToken } from '../../components/generate'
import '../../components/template'

describe('Wardrobe API Testing - Question', () => {
    const is_paginate = false
    const token = generateAuthToken("hardcode")

    it('Get Question FAQ', () => {
        cy.request({
            method: 'get',
            url: `/api/v1/question/faq`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as('GetQuestionFAQ')
        cy.get('@GetQuestionFAQ').then(dt => {
            cy.templateGet(200,dt, is_paginate)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataArr = resultItem.data
            expect(dataArr).to.be.an('array')

            // Get list key / column
            const stringFields = ['question','answer','created_at']

            // Validate column
            cy.templateValidateColumn(dataArr, stringFields, 'string', false)

            // Validate character length
            // In the DB, answer can be null, but for this specific API only get the answered question
            const columnProps = [
                { column_name : 'question', data_type: 'string', max: 144, min: 1, nullable: false },
                { column_name : 'answer', data_type: 'string', max: 255, min: 1, nullable: false },
            ]
            cy.templateValidateMaxMin(dataArr, columnProps)
        })
    })
})