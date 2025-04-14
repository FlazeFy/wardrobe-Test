// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-EX-002 - Export', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can Download Exported Data Of Clothes', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu button that contain username to open the Profile Page
            cy.get('.navbar').contains('a', username).click()
            cy.url().should('include', '/profile')

            // Step 2: At the "Export My Data" section, find the sub section "Clothes Data". Click button "Download Excel" to export clothes data
            cy.get('#export_data-section').should('exist').within(()=>{
                cy.get('h2').contains('Export My Data')
                cy.get('#export_data_clothes-section').should('exist').within(()=>{
                    cy.get('h5').contains('Clothes Data')
                    cy.contains('a','Download excel').click()
                })
            })

            // Step 3: Success pop up with text "Clothes data downloaded" will appear
            cy.get('.swal2-popup:not(.swal2-loading)', { timeout: 5000 }).should('exist').then(() => {
                cy.get('.swal2-html-container').invoke('text').then((text)=>{
                    expect(text).to.equal('Clothes data downloaded')
                })
                cy.get('.swal2-popup').contains('button', 'Okay!').click()
            })
            // Evidence - Step 4
            cy.screenshot(`TC-EX-002_Step-3-${date}`)
        })
    })
})
