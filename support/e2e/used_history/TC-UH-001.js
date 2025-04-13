// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-UH-001 - Used History', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can See History Of Used', () => {
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
            cy.get('#used_history-table tbody tr').each(($tr) => {
                // Date Column
                cy.wrap($tr).find('td').first().within(() => {
                    cy.get('p').eq(0).invoke('text').then((text) => {
                        const value = text.replace('Name :', '').trim()
                        expect(value).to.not.equal('')
                    })
                    cy.get('p').eq(1).invoke('text').then((text) => {
                        const value = text.replace('Type :', '').trim()
                        expect(value).to.not.equal('')
                    })
                })                
                // Context & Notes
                cy.wrap($tr).find('td').eq(1).within(() => {
                    cy.get('p').eq(0).invoke('text').then((text) => {
                        const value = text.replace('Context :', '').trim()
                        expect(value).to.not.equal('')
                    })

                    // Outside P for notes
                    const fullText = $td.text()
                    const contextText = $td.find('p').eq(0).text()
                    const notesText = fullText.replace(contextText, '').trim()
                    expect(notesText).to.not.equal('')
                })
                // Used At
                cy.wrap($tr).find('td').eq(2).then((text) => {
                    expect(text).to.not.equal('')
                })
                // Manage Column
                cy.wrap($tr).find('td').last().within(() => {
                    cy.get('button svg').should('have.length', 1)
                    cy.get('button').first().should('have.class', 'btn-danger')
                })
            })

            // Evidence - Step 3
            cy.screenshot(`TC-UH-001_Step-3-${date}`)
        })
    })
})
