// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-CL-010 - Clothes', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')
    const clothes_data = {
        clothes_name: ' ',
        clothes_desc: 'A comfortable cotton t-shirt perfect for daily wear.',
        clothes_merk: 'Uniqlo',
        clothes_price: 199,
        clothes_qty: 10,
        clothes_gender: 'male',
        clothes_size: 'L',
        clothes_type: 'shirt',
        clothes_made_from: 'cloth',
        clothes_category: 'upper_body',
        clothes_buy_at: '2024-01-01',
        is_faded: true,
        has_ironed: true,
        is_favorite: true
    };

    it('User Cant Add A Clothes With Missing Clothes Name', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Clothes"
            cy.get('.navbar').contains('a', 'Clothes').click()
            cy.url().should('include', '/clothes')

            // Step 2: In the Clothes Page, Search "Add Clothes" button
            cy.contains('a', 'Add Clothes').click()
            cy.url().should('include', '/clothes/add')
            // Evidence - Step 2
            cy.screenshot(`TC-CL-010_Step-2-${date}`)

            // Step 3: Fill the Clothes Data in Form at the Section "Add Form" 
            cy.contains('.form-container', 'Add Form').within(() => {
                cy.get('#clothes_name').type(clothes_data.clothes_name)
                cy.get('#clothes_desc').type(clothes_data.clothes_desc)
                cy.get('#clothes_merk').type(clothes_data.clothes_merk)
                cy.get('#clothes_price').clear().type(clothes_data.clothes_price.toString())
                cy.get('#clothes_qty').clear().type(clothes_data.clothes_qty.toString())
                cy.get('#clothes_gender').select(clothes_data.clothes_gender)
                cy.get('#clothes_size').select(clothes_data.clothes_size)
                cy.get('#clothes_type').select(clothes_data.clothes_type)
                cy.get('#clothes_made_from').select(clothes_data.clothes_made_from)
                cy.get('#clothes_category').select(clothes_data.clothes_category)
                cy.get('#clothes_buy_at').type(clothes_data.clothes_buy_at)
                cy.get('#is_faded').check({ force: clothes_data.is_faded })   
                cy.get('#has_ironed').check({ force: clothes_data.has_ironed })
                cy.get('#is_favorite').check({ force: clothes_data.is_favorite })

                // Evidence - Step 3
                cy.screenshot(`TC-CL-010_Step-3-${date}`)

                // Step 4: Click the "Save Changes" button
                cy.contains('button', 'Save Changes').click()
            });

            // Step 5: A Failed Pop Up will appear with text "The clothes name field is required". Click "Okay!"
            cy.get('.swal2-popup:not(.swal2-loading)', { timeout: 10000 }).should('exist').then(() => {
                cy.get('.swal2-html-container').invoke('text').then((text)=>{
                    expect(text).to.equal(`The clothes name field is required`)
                })
                // Evidence - Step 5
                cy.screenshot(`TC-CL-010_Step-5-${date}`)
                cy.get('.swal2-popup').contains('button', 'Okay!').click()
            })
        })
    })
})
