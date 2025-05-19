// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-CL-013 - Clothes', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')
    let clothes_name = null

    it('User Can Delete A Clothes', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Clothes"
            cy.get('.navbar').contains('a', 'Clothes').click()
            cy.url().should('include', '/clothes')

            // Step 2: After section with title "All Clothes", there will be list of clothes press button "Detail"
            cy.get('h2').contains('All Clothes')
            cy.get('#clothes_holder .box-clothes').first().within($el => {
                // Clothes Name
                cy.wrap($el).find('h4').should('exist').and('not.be.empty').invoke('text').then(text => {
                    clothes_name = text
                })
                cy.wrap($el).contains('a', 'Detail').click()
            })
            // Evidence - Step 2
            cy.screenshot(`TC-CL-013_Step-2-${date}`)

            // Step 3: At the detail page, In the section "Delete Clothes" there will be some information about clothes deletion, type the clothes name
            cy.url().should('include', '/clothes/detail')
            cy.get('#delete_clothes-section').within(() => {
                cy.get('h2').should('contain.text', 'Delete Clothes')
                cy.get('p').should('contain.text','You can delete this clothes and still can be Recovered before it pass 30 days since it was deleted. And also you can permanentally delete it right now after normal delete if you want it dissapear before 30 days')

                // Clothes Name Confirmation
                cy.get('#clothes_name_delete_confirmation').type(clothes_name)

                // Step 4: Click button "Delete"
                cy.contains('button', 'Delete').click()
            })            

            // Step 5 : In the pop up validation with description "Want to delete this clothes?", press button "Yes, Delete It!"
            cy.get('.swal2-popup', { timeout: 5000 }).should('exist').then(() => {
                cy.get('.swal2-html-container').invoke('text').then((text)=>{
                    expect(text).to.equal('Want to delete this clothes?')
                })
                cy.get('.swal2-popup').contains('button', 'Yes, Delete it!').click()
            })
            // Evidence - Step 5
            cy.screenshot(`TC-CL-013_Step-5-${date}`)

            // Step 6 : Success pop up with text "clothes deleted" will appear
            cy.get('.swal2-popup', { timeout: 5000 }).should('exist').then(() => {
                cy.get('.swal2-html-container').invoke('text').then((text)=>{
                    expect(text).to.equal('clothes deleted')
                })
                cy.get('.swal2-popup').contains('button', 'Okay!').click()
            })
            // Evidence - Step 6
            cy.screenshot(`TC-CL-013_Step-6-${date}`)
        })
    })
})
