// Components
import { generateAuthToken } from '../../components/generate'
import '../../components/template'

describe('Wardrobe API Testing - User', () => {
    const is_paginate = false
    const token = generateAuthToken("hardcode")

    it('Get My Profile', () => {
        cy.request({
            method: 'get',
            url: `/api/v1/user/my`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as('GetMyProfile')
        cy.get('@GetMyProfile').then(dt => {
            cy.templateGet(200,dt, null)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataObj = resultItem.data
            expect(dataObj).to.be.an('object')

            // Get list key / column
            const stringFields = ['username','email','created_at']
            const stringNullableFields = ['telegram_user_id','updated_at']
            const intFields = ['telegram_is_valid']

            // Validate column
            cy.templateValidateColumn(dataObj, stringFields, 'string', false)
            cy.templateValidateColumn(dataObj, stringNullableFields, 'string', true)
            cy.templateValidateColumn(dataObj, intFields, 'number', false)
        })
    })
})