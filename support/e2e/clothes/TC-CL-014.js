// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-CL-014 - Clothes', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can Recover A Deleted Clothes', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Clothes"
            cy.get('.navbar').contains('a', 'Clothes').click()
            cy.url().should('include', '/clothes')

            // Step 2: In the Clothes Menu, Click the button "Deleted Clothes"
            cy.contains('a', 'Deleted Clothes').click()
            cy.url().should('include', '/clothes/trash')
            // Evidence - Step 2
            cy.screenshot(`TC-CL-014_Step-2-${date}`)

            // Step 3: At the table, You can see the list of deleted clothes. Click the recover button at the first clothes
            cy.get('#deleted_clothes-table tbody tr').first().find('td').last().within(() => {
                cy.get('.btn-recover').click()
            })

            // Step 4 : In the pop up validation with description "Want to recover deleted clothes?", press button "Yes, Recover It!"
            cy.get('.swal2-popup', { timeout: 5000 }).should('exist').then(() => {
                cy.get('.swal2-html-container').invoke('text').then((text)=>{
                    expect(text).to.equal('Want to recover deleted clothes?')
                })
                cy.get('.swal2-popup').contains('button', 'Yes, Recover it!').click()
            })
            // Evidence - Step 4
            cy.screenshot(`TC-CL-014_Step-4-${date}`)

            // Step 5 : Success pop up with text "clothes recovered" will appear
            cy.get('.swal2-popup', { timeout: 5000 }).should('exist').then(() => {
                cy.get('.swal2-html-container').invoke('text').then((text)=>{
                    expect(text).to.equal('clothes recovered')
                })
                cy.get('.swal2-popup').contains('button', 'Okay!').click()
            })
            // Evidence - Step 5
            cy.screenshot(`TC-CL-014_Step-5-${date}`)
        })
    })
})
