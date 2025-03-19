// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-US-001 - User', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can See Their Profile', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu button that contain username to open the Profile Page
            cy.get('.navbar').contains('a', username).click()
            cy.url().should('include', '/profile')

            // Step 2: In the "Edit Profile" section, user can see username, email, and Telegram user ID
            cy.get(`#edit_profile-section`).contains('Edit Profile')
            const inputHolderElement = [
                { selector: '#username-input', max: 36, min: 6, nullable: false },
                { selector: '#email-input', max: 144, min: 10, nullable: false },
                { selector: '#telegram_user_id-input', max: 36, min: 10, nullable: true }
            ]
            inputHolderElement.forEach(el => {
                cy.get(`#edit_profile-section ${el.selector}`)
                    .invoke('val')
                    .then(val => {
                        if (el.nullable && val === "") {
                            return 
                        }
                        expect(val.length).to.be.at.least(el.min)
                        expect(val.length).to.be.at.most(el.max)
                    })
            })

            // Evidence - Step 2
            cy.screenshot(`TC-US-001_Step-2-${date}`)
        })
    })
})
