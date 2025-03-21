describe('Wardrobe E2E Test - TC-ST-003 - Stats', () => {
    const date = new Date().toISOString().replace(/:/g, '-')
    const BASEURL = 'http://localhost:3000'

    it('User Can See Summary Of Apps', () => {
        // Step 1: Visit Login Page
        cy.visit(`${BASEURL}/`)

        // Step 2: At the Top of the Page, Find section with title "Active User", "Outfit Decision", "Clothes", and "Schedule Reminder"
        cy.get('#summary_apps-section').within(() => {
            const summaryTitle = ["Active User", "Outfit Decision", "Clothes", "Schedule Reminder"]
            summaryTitle.forEach(dt => {
                cy.contains('h5', dt).prev('h3').invoke('text').then(text => {
                    const val = parseInt(text.replace('+', '').trim())
                    expect(val).to.be.at.least(0)
                })
            })
        })

        // Evidence - Step 2
        cy.screenshot(`TC-ST-003_Step-2-${date}`)
    })
})
