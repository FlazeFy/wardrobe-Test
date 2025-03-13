// Components
import { generateAuthToken } from '../../components/generate'
import '../../components/template'

describe('Wardrobe API Testing - Error', () => {
    const is_paginate = true
    const token = generateAuthToken("hardcode_admin")

    it('Get All Error', () => {
        cy.request({
            method: 'get',
            url: `/api/v1/error`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as('GetAllError')
        cy.get('@GetAllError').then(dt => {
            cy.templateGet(200,dt, is_paginate)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataArr = resultItem.data.data
            expect(dataArr).to.be.an('array')

            // Get list key / column
            const stringFields = ['message','stack_trace','file','created_at']
            const stringNullableFields = ['faced_by']
            const intFields = ['id','line']

            // Validate column
            cy.templateValidateColumn(dataArr, stringFields, 'string', false)
            cy.templateValidateColumn(dataArr, stringNullableFields, 'string', true)
            cy.templateValidateColumn(dataArr, intFields, 'number', false)
        })
    })
})