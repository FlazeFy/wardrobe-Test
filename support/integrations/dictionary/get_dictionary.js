// Components
import { generateAuthToken } from '../../components/generate'
import '../../components/template'

describe('Wardrobe API Testing - Dictionary', () => {
    const is_paginate = false
    const token = generateAuthToken("hardcode")

    it('Get All Dictionary By Type', () => {
        const type = 'wash_type'
        cy.request({
            method: 'get',
            url: `/api/v1/dct/${type}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as('GetAllDictionaryByType')
        cy.get('@GetAllDictionaryByType').then(dt => {
            cy.templateGet(200,dt, is_paginate)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataArr = resultItem.data
            expect(dataArr).to.be.an('array')

            // Get list key / column
            const stringFields = ['dictionary_name','dictionary_type']

            // Validate column
            cy.templateValidateColumn(dataArr, stringFields, 'string', false)

            // Contain validation
            const dctTypeList = ['used_context','wash_type','clothes_type','clothes_category','clothes_gender','clothes_made_from','clothes_size']
            cy.templateValidateContain(dataArr,dctTypeList,'dictionary_type')

            // Validate character length
            const columnProps = [
                { column_name : 'dictionary_name', data_type: 'string', max: 36, min: 1, nullable: false },
                { column_name : 'dictionary_type', data_type: 'string', max: 36, min: 1, nullable: false },
            ]
            cy.templateValidateMaxMin(dataArr, columnProps)
        })
    })

    it('Get Category Type Clothes', () => {
        cy.request({
            method: 'get',
            url: `/api/v1/dct/clothes/category_type`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as('GetCategoryTypeClothes')
        cy.get('@GetCategoryTypeClothes').then(dt => {
            cy.templateGet(200,dt, is_paginate)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataArr = resultItem.data
            expect(dataArr).to.be.an('array')

            // Get list key / column
            const stringFields = ['clothes_category','clothes_type']
            const intFields = ['total']

            // Validate column
            cy.templateValidateColumn(dataArr, stringFields, 'string', false)
            cy.templateValidateColumn(dataArr, intFields, 'number', false)

            // Validate character length
            const columnProps = [
                { column_name : 'clothes_category', data_type: 'string', max: 36, min: 1, nullable: false },
                { column_name : 'clothes_type', data_type: 'string', max: 36, min: 1, nullable: false },
                { column_name : 'total', data_type: 'number', max: null, min: 0, nullable: false },
            ]
            cy.templateValidateMaxMin(dataArr, columnProps)
        })
    })
})