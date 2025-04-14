// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-UH-002 - Used History', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can Delete History Of Used', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Clothes"
            cy.get('.navbar').contains('a', 'Clothes').click()
            cy.url().should('include', '/clothes')

            // Step 2: In the Clothes Page, Click button "Used History"
            cy.contains('a','Used History').click()
            cy.url().should('include', '/clothes/used')
                        
            // Step 3: In the table, there is a clothes column (name & type), context & notes, used at, and delete button
            const expected_header = ['Clothes','Context & Notes','Used At','Delete']
            cy.get('#used_history-table thead th').each(($th, idx) => {
                cy.wrap($th).invoke('text').then((text) => {
                    expect(text.trim()).to.equal(expected_header[idx])
                })
            })
            // Evidence - Step 3
            cy.screenshot(`TC-UH-002_Step-3-${date}`)

            // Step 4: Click the first's item delete button
            cy.get('#used_history-table tbody tr').first().find('td').last().find('button').click()
            // Evidence - Step 4
            cy.screenshot(`TC-UH-002_Step-4-${date}`)

            // Step 5 : In the pop up validation with description "Want to permanentally delete this history?", press button "Yes, Delete It!"
            cy.get('.swal2-popup', { timeout: 5000 }).should('exist').then(() => {
                cy.get('.swal2-html-container').invoke('text').then((text)=>{
                    expect(text).to.equal('Want to permanentally delete this history?')
                })
                cy.get('.swal2-popup').contains('button', 'Yes, Delete it!').click()
            })
            // Evidence - Step 5
            cy.screenshot(`TC-UH-002_Step-5-${date}`)

            // Step 6 : Success pop up with text "clothes used permentally deleted" will appear
            cy.get('.swal2-popup', { timeout: 5000 }).should('exist').then(() => {
                cy.get('.swal2-html-container').invoke('text').then((text)=>{
                    expect(text).to.equal('clothes used permentally deleted')
                })
                cy.get('.swal2-popup').contains('button', 'Okay!').click()
            })
            // Evidence - Step 6
            cy.screenshot(`TC-UH-002_Step-6-${date}`)
        })
    })
})
