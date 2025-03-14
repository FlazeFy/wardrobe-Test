// Components
import { generateAuthToken } from '../../components/generate'
import '../../components/template'

describe('Wardrobe API Testing - Clothes', () => {
    const is_paginate = true
    const token = generateAuthToken("hardcode")

    it('Get Check Clothes Wash Status', () => {
        const clothes_id = '10bacb64-e819-11ed-a05b-0242ac120003'

        cy.request({
            method: 'get',
            url: `/api/v1/clothes/check_wash/${clothes_id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as('GetCheckClothesWashStatus')
        cy.get('@GetCheckClothesWashStatus').then(dt => {
            cy.templateGet(200,dt, null)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataBool = resultItem.data
            expect(dataBool).to.be.an('boolean')
            expect(resultItem.message).contain('This clothes is')
        })
    })

    it('Get All Clothes Header', () => {
        const clothes_category = "head"
        const order = "desc"

        cy.request({
            method: 'get',
            url: `/api/v1/clothes/header/${clothes_category}/${order}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as('GetAllClothesHeader')
        cy.get('@GetAllClothesHeader').then(dt => {
            cy.templateGet(200,dt, is_paginate)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataArr = resultItem.data.data
            expect(dataArr).to.be.an('array')

            // Get list key / column
            const stringFields = ['id','clothes_name','clothes_size','clothes_gender','clothes_color','clothes_category','clothes_type']
            const intFields = ['clothes_qty','is_faded','has_washed','has_ironed','is_favorite','is_scheduled']
            const boolIntFields = ['is_faded','has_washed','has_ironed','is_favorite','is_scheduled']

            // Validate column
            cy.templateValidateColumn(dataArr, stringFields, 'string', false)
            cy.templateValidateColumn(dataArr, intFields, 'number', false)
            cy.templateValidateColumn(dataArr, boolIntFields, 'number', false)
        })
    })

    it('Get All Clothes Detail', () => {
        const clothes_category = "head"
        const order = "desc"

        cy.request({
            method: 'get',
            url: `/api/v1/clothes/detail/${clothes_category}/${order}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as('GetAllClothesDetail')
        cy.get('@GetAllClothesDetail').then(dt => {
            cy.templateGet(200,dt, is_paginate)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataArr = resultItem.data.data
            expect(dataArr).to.be.an('array')

            // Get list key / column
            const stringFields = ['id','clothes_name','clothes_size','clothes_gender','clothes_color','clothes_category','clothes_type']
            const stringNullableFields = ['clothes_desc','clothes_merk','clothes_buy_at','updated_at','deleted_at' ]
            const intFields = ['clothes_qty','is_faded','has_washed','has_ironed','is_favorite','is_scheduled']
            const boolIntFields = ['is_faded','has_washed','has_ironed','is_favorite','is_scheduled']

            // Validate column
            cy.templateValidateColumn(dataArr, stringFields, 'string', false)
            cy.templateValidateColumn(dataArr, stringNullableFields, 'string', true)
            cy.templateValidateColumn(dataArr, intFields, 'number', false)
            cy.templateValidateColumn(dataArr, boolIntFields, 'number', false)
        })
    })
})