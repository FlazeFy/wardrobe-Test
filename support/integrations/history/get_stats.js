// Components
import { generateAuthToken } from '../../components/generate'
import '../../components/template'

describe('Wardrobe API Testing - History', () => {
    const is_paginate = true
    const token = generateAuthToken("hardcode")

    it('Get All History', () => {
        cy.request({
            method: 'get',
            url: `/api/v1/history`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as('GetAllHistory')
        cy.get('@GetAllHistory').then(dt => {
            cy.templateGet(200,dt, is_paginate)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataArr = resultItem.data.data
            expect(dataArr).to.be.an('array')

            // Get list key / column
            const stringFields = ['id','history_type', 'history_context', 'created_at', 'created_by']

            // Validate column
            cy.templateValidateColumn(dataArr, stringFields, 'string', false)
        })
    })
})