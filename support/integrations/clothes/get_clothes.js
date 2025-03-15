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

            // Validate character length
            const columnPropsClothes = [
                { column_name : 'id', data_type: 'string', max: 36, min: 36, nullable: false },
                { column_name : 'clothes_name', data_type: 'string', max: 75, min: 1, nullable: false },
                { column_name : 'clothes_size', data_type: 'string', max: 3, min: 1, nullable: true },
                { column_name : 'clothes_gender', data_type: 'string', max: 6, min: 1, nullable: true },
                { column_name : 'clothes_merk', data_type: 'string', max: 75, min: 1, nullable: true },
                { column_name : 'clothes_image', data_type: 'string', max: 500, min: 1, nullable: true },    
                { column_name : 'clothes_color', data_type: 'string', max: 36, min: 1, nullable: true },    
                { column_name : 'clothes_type', data_type: 'string', max: 36, min: 1, nullable: false },
                { column_name : 'clothes_qty', data_type: 'number', max: null, min: 1, nullable: false },
                { column_name : 'clothes_category', data_type: 'string', max: 36, min: 1, nullable: false },
                { column_name : 'is_faded', data_type: 'number', max: 1, min: 0, nullable: false },
                { column_name : 'has_washed', data_type: 'number', max: 1, min: 0, nullable: false },
                { column_name : 'has_ironed', data_type: 'number', max: 1, min: 0, nullable: false },
                { column_name : 'is_favorite', data_type: 'number', max: 1, min: 0, nullable: false },
                { column_name : 'is_scheduled', data_type: 'number', max: 1, min: 0, nullable: false },
            ]
            cy.templateValidateMaxMin(dataArr, columnPropsClothes)
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
            const intNullableFields = ['clothes_price']
            const boolIntFields = ['is_faded','has_washed','has_ironed','is_favorite','is_scheduled']

            // Validate column
            cy.templateValidateColumn(dataArr, stringFields, 'string', false)
            cy.templateValidateColumn(dataArr, stringNullableFields, 'string', true)
            cy.templateValidateColumn(dataArr, intFields, 'number', false)
            cy.templateValidateColumn(dataArr, intNullableFields, 'number', true)
            cy.templateValidateColumn(dataArr, boolIntFields, 'number', false)

            // Validate character length
            const columnPropsClothes = [
                { column_name : 'id', data_type: 'string', max: 36, min: 36, nullable: false },
                { column_name : 'clothes_name', data_type: 'string', max: 75, min: 1, nullable: false},
                { column_name : 'clothes_size', data_type: 'string', max: 3, min: 1, nullable: true },
                { column_name : 'clothes_gender', data_type: 'string', max: 6, min: 1, nullable: true },
                { column_name : 'clothes_merk', data_type: 'string', max: 75, min: 1, nullable: true },
                { column_name : 'clothes_image', data_type: 'string', max: 500, min: 1, nullable: true },    
                { column_name : 'clothes_color', data_type: 'string', max: 36, min: 1, nullable: true },    
                { column_name : 'clothes_type', data_type: 'string', max: 36, min: 1, nullable: false },
                { column_name : 'clothes_qty', data_type: 'number', max: null, min: 1, nullable: false },
                { column_name : 'clothes_price', data_type: 'number', max: null, min: 1, nullable: false },
                { column_name : 'clothes_category', data_type: 'string', max: 36, min: 1, nullable: false },
                { column_name : 'is_faded', data_type: 'number', max: 1, min: 0, nullable: false },
                { column_name : 'has_washed', data_type: 'number', max: 1, min: 0, nullable: false },
                { column_name : 'has_ironed', data_type: 'number', max: 1, min: 0, nullable: false },
                { column_name : 'is_favorite', data_type: 'number', max: 1, min: 0, nullable: false },
                { column_name : 'is_scheduled', data_type: 'number', max: 1, min: 0, nullable: false },
            ]
            cy.templateValidateMaxMin(dataArr, columnPropsClothes)
        })
    })

    it('Get Clothes Similiar By', () => {
        const similiar_val = "Hat"
        const similiar_context = "clothes_name"
        const exclude_clothes_id = "2d98f524-de02-11ed-b5ea-0242ac120002"

        cy.request({
            method: 'get',
            url: `/api/v1/clothes/similiar/${similiar_context}/${similiar_val}/${exclude_clothes_id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as('GetClothesSimiliarBy')
        cy.get('@GetClothesSimiliarBy').then(dt => {
            cy.templateGet(200,dt, null)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataArr = resultItem.data
            expect(dataArr).to.be.an('array')

            // Get list key / column
            const stringFields = ['id','clothes_name','clothes_category','clothes_type']

            // Validate column
            cy.templateValidateColumn(dataArr, stringFields, 'string', false)

            // Validate character length
            const columnProps = [
                { column_name : 'id', data_type: 'string', max: 36, min: 36, nullable: false },
                { column_name : 'clothes_name', data_type: 'string', max: 75, min: 1, nullable: false },
                { column_name : 'clothes_category', data_type: 'string', max: 36, min: 1, nullable: false },
                { column_name : 'clothes_type', data_type: 'string', max: 36, min: 1, nullable: false },
            ]
            cy.templateValidateMaxMin(dataArr, columnProps)
        })
    })

    it('Get Wash Checkpoint By Clothes Id', () => {
        const clothes_id = "10bacb64-e819-11ed-a05b-0242ac120003"

        cy.request({
            method: 'get',
            url: `/api/v1/clothes/wash_checkpoint/${clothes_id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as('GetWashCheckpointByClothesId')
        cy.get('@GetWashCheckpointByClothesId').then(dt => {
            cy.templateGet(200,dt, null)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataObj = resultItem.data
            expect(dataObj).to.be.an('object')

            // Get list key / column
            const washCheckpoint = dataObj.wash_checkpoint
            const stringFields = ['wash_type']
            const stringNullableFields = ['wash_note']

            cy.templateValidateColumn(dataObj, stringFields, 'string', false)
            cy.templateValidateColumn(dataObj, stringNullableFields, 'string', true)

            // Validate character length
            const columnProps = [
                { column_name : 'wash_type', data_type: 'string', max: 36, min: 1, nullable: false },
                { column_name : 'wash_note', data_type: 'string', max: 75, min: 1, nullable: true },
            ]
            cy.templateValidateMaxMin(dataObj, columnProps)

            if(washCheckpoint){
                expect(washCheckpoint).to.be.an('array')

                washCheckpoint.forEach(dt => {
                    const stringFields = ['id','checkpoint_name']
                    const boolFields = ['is_finished']

                    // Validate column
                    cy.templateValidateColumn(dt, stringFields, 'string', false)
                    cy.templateValidateColumn(dt, boolFields, 'boolean', false)
                });
            }
        })
    })

    it('Get Deleted Clothes', () => {
        cy.request({
            method: 'get',
            url: `/api/v1/clothes/trash`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as('GetDeletedClothes')
        cy.get('@GetDeletedClothes').then(dt => {
            cy.templateGet(200,dt, is_paginate)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataArr = resultItem.data.data
            expect(dataArr).to.be.an('array')

            // Get list key / column
            const stringFields = ['id','clothes_name','clothes_size','clothes_gender','clothes_color','clothes_category','clothes_type']
            const stringNullableFields = ['deleted_at']
            const intFields = ['clothes_qty']

            // Validate column
            cy.templateValidateColumn(dataArr, stringFields, 'string', false)
            cy.templateValidateColumn(dataArr, stringNullableFields, 'string', true)
            cy.templateValidateColumn(dataArr, intFields, 'number', false)   

            // Validate character length
            const columnProps = [
                { column_name : 'id', data_type: 'string', max: 36, min: 36, nullable: false },
                { column_name : 'clothes_name', data_type: 'string', max: 75, min: 1, nullable: false },
                { column_name : 'clothes_size', data_type: 'string', max: 3, min: 1, nullable: false },
                { column_name : 'clothes_gender', data_type: 'string', max: 6, min: 1, nullable: false },    
                { column_name : 'clothes_color', data_type: 'string', max: 6, min: 1, nullable: false },    
                { column_name : 'clothes_type', data_type: 'string', max: 36, min: 1, nullable: false },
                { column_name : 'clothes_category', data_type: 'string', max: 36, min: 1, nullable: false },
                { column_name : 'clothes_qty', data_type: 'number', max: 999, min: 1, nullable: false },
            ]
            cy.templateValidateMaxMin(dataArr, columnProps)
        })
    })

    it('Get Clothes Detail By Id', () => {
        const clothes_id = "10bacb64-e819-11ed-a05b-0242ac120003"

        cy.request({
            method: 'get',
            url: `/api/v1/clothes/detail/${clothes_id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as('GetClothesDetailById')
        cy.get('@GetClothesDetailById').then(dt => {
            cy.templateGet(200,dt, null)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataObj = resultItem.data
            expect(dataObj).to.be.an('object')

            // Get list key / column
            const stringFieldsDetail = ['id', 'clothes_name', 'clothes_size', 'clothes_gender', 'clothes_made_from', 'clothes_color', 'clothes_category', 'clothes_type', 'created_at', 'created_by']
            const stringNullableFieldsDetail = ['clothes_desc','clothes_merk','clothes_buy_at','updated_at','deleted_at']
            const intFieldsDetail = ['clothes_qty','is_faded','has_washed','has_ironed','is_favorite','is_scheduled']

            // // Validate column
            cy.templateValidateColumn(dataObj['detail'], stringFieldsDetail, 'string', false)
            cy.templateValidateColumn(dataObj['detail'], stringNullableFieldsDetail, 'string', true)
            cy.templateValidateColumn(dataObj['detail'], intFieldsDetail, 'number', false)  
            
            if(dataObj['used_history']){
                dataObj['used_history'].forEach(dt => {
                    // Get list key / column
                    const stringFieldsUsedHistory = ['id', 'used_context', 'created_at']
                    const stringNullableFieldsUsedHistory = ['clothes_note']

                    // // Validate column
                    cy.templateValidateColumn(dt, stringFieldsUsedHistory, 'string', false)
                    cy.templateValidateColumn(dt, stringNullableFieldsUsedHistory, 'string', true)

                    // Validate character length
                    const columnPropsUsedHistory= [
                        { column_name : 'id', data_type: 'string', max: 36, min: 36, nullable: false },
                        { column_name : 'used_context', data_type: 'string', max: 36, min: 1, nullable: false },
                        { column_name : 'clothes_note', data_type: 'string', max: 255, min: 1, nullable: true },
                    ]
                    cy.templateValidateMaxMin(dt, columnPropsUsedHistory)
                })
            }

            if(dataObj['wash_history']){
                dataObj['wash_history'].forEach(dt => {
                    // Get list key / column
                    const stringFieldsWashHistory = ['wash_type', 'created_at']
                    const stringNullableFieldsWashHistory = ['wash_note', 'finished_at']
                    const arrayNullableFieldsWashHistory = ['wash_checkpoint']

                    // // Validate column
                    cy.templateValidateColumn(dt, stringFieldsWashHistory, 'string', false)
                    cy.templateValidateColumn(dt, stringNullableFieldsWashHistory, 'string', true)
                    cy.templateValidateColumn(dt, arrayNullableFieldsWashHistory, 'array', true)

                    if(dt['wash_checkpoint']){
                        dt['wash_checkpoint'].forEach(dt_wc => {
                            const stringFieldsWashCheckpoint = ['id','checkpoint_name']
                            const boolFieldsWashCheckpoint = ['is_finished']

                            // Validate column
                            cy.templateValidateColumn(dt_wc, stringFieldsWashCheckpoint, 'string', false)
                            cy.templateValidateColumn(dt_wc, boolFieldsWashCheckpoint, 'boolean', false)
                        })
                    }
                })
            }

            if(dataObj['outfit']){
                dataObj['outfit'].forEach(dt => {
                    // Get list key / column
                    const stringFieldsOutfit = ['id','outfit_name','created_at']
                    const stringNullableFieldsOutfit = ['outfit_note','last_used']
                    const intFieldsOutfit = ['is_favorite','total_used']

                    // // Validate column
                    cy.templateValidateColumn(dt, stringFieldsOutfit, 'string', false)
                    cy.templateValidateColumn(dt, stringNullableFieldsOutfit, 'string', true)
                    cy.templateValidateColumn(dt, intFieldsOutfit, 'number', false)

                    // Validate character length
                    const columnPropsOutfit = [
                        { column_name : 'id', data_type: 'string', max: 36, min: 36, nullable: false },
                        { column_name : 'outfit_name', data_type: 'string', max: 36, min: 1, nullable: false },
                        { column_name : 'outfit_note', data_type: 'string', max: 255, min: 1, nullable: true },
                        { column_name : 'is_favorite', data_type: 'number', max: 1, min: 0, nullable: false },
                        { column_name : 'total_used', data_type: 'number', max: null, min: 0, nullable: false },
                    ]
                    cy.templateValidateMaxMin(dt, columnPropsOutfit)
                })
            }
        })
    })

    it('Get All Outfit', () => {
        cy.request({
            method: 'get',
            url: `/api/v1/clothes/outfit`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as('GetAllOutfit')
        cy.get('@GetAllOutfit').then(dt => {
            cy.templateGet(200,dt, is_paginate)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataArr = resultItem.data.data
            expect(dataArr).to.be.an('array')

            // Get list key / column
            const stringFields = ['id', 'outfit_name']
            const stringNullableFields = ['outfit_note']
            const intFields = ['is_favorite','total_used']

            // // Validate column
            cy.templateValidateColumn(dataArr, stringFields, 'string', false)
            cy.templateValidateColumn(dataArr, stringNullableFields, 'string', true)
            cy.templateValidateColumn(dataArr, intFields, 'number', false)

            // Validate character length
            const columnProps = [
                { column_name : 'id', data_type: 'string', max: 36, min: 36, nullable: false },
                { column_name : 'outfit_name', data_type: 'string', max: 36, min: 1, nullable: false },
                { column_name : 'outfit_note', data_type: 'string', max: 255, min: 1, nullable: true },
                { column_name : 'is_favorite', data_type: 'number', max: 1, min: 0, nullable: false },
                { column_name : 'total_used', data_type: 'number', max: null, min: 0, nullable: false },
            ]
            cy.templateValidateMaxMin(dataArr, columnProps)

            dataArr.forEach(dt => {
                if(dt['clothes']){
                    dt['clothes'].forEach(dt_cl => {
                        // Get list key / column
                        const stringFields = ['id','clothes_name','clothes_type','clothes_color']
                        const stringNullableFields = ['clothes_merk','clothes_image']
                        const intFields = ['has_washed']
    
                        // // Validate column
                        cy.templateValidateColumn(dt_cl, stringFields, 'string', false)
                        cy.templateValidateColumn(dt_cl, stringNullableFields, 'string', true)
                        cy.templateValidateColumn(dt_cl, intFields, 'number', false)

                        // Validate character length
                        const columnPropsClothes = [
                            { column_name : 'id', data_type: 'string', max: 36, min: 36, nullable: false },
                            { column_name : 'clothes_name', data_type: 'string', max: 75, min: 1, nullable: false },
                            { column_name : 'clothes_merk', data_type: 'string', max: 75, min: 1, nullable: true },
                            { column_name : 'clothes_image', data_type: 'string', max: 500, min: 1, nullable: true },    
                            { column_name : 'clothes_color', data_type: 'string', max: 36, min: 1, nullable: true },    
                            { column_name : 'clothes_type', data_type: 'string', max: 36, min: 1, nullable: false },
                            { column_name : 'has_washed', data_type: 'number', max: 1, min: 0, nullable: false },
                        ]
                        cy.templateValidateMaxMin(dt_cl, columnPropsClothes)
                    })
                }
            })
        })
    })

    it('Get Last Outfit', () => {
        cy.request({
            method: 'get',
            url: `/api/v1/clothes/outfit/last`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).as('GetLastOutfit')
        cy.get('@GetLastOutfit').then(dt => {
            cy.templateGet(200,dt, null)

            // Get item holder
            const resultItem = dt.body
            expect(resultItem).to.have.property('data')
            const dataObj = resultItem.data
            expect(dataObj).to.be.an('object')

            // Get list key / column
            const stringFields = ['id', 'outfit_name']
            const intFields = ['is_favorite','total_used']

            // // Validate column
            cy.templateValidateColumn(dataObj, stringFields, 'string', false)
            cy.templateValidateColumn(dataObj, intFields, 'number', false)

            if(dataObj['clothes']){
                dataObj['clothes'].forEach(dt_cl => {
                    // Get list key / column
                    const stringFields = ['clothes_name','clothes_type']
                    const stringNullableFields = ['clothes_image']

                    // // Validate column
                    cy.templateValidateColumn(dt_cl, stringFields, 'string', false)
                    cy.templateValidateColumn(dt_cl, stringNullableFields, 'string', true)
                })
            }
        })
    })
})