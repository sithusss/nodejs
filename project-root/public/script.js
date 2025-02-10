document.addEventListener('DOMContentLoaded', () => {
    paypal.Buttons({
        createOrder: function() {
            // Simulate unresponsive API call
            return new Promise(() => {});
        },
        onError: function(err) {
            // This will never trigger in this simulation
        }
    }).render('#paypal-button-container');

    // Show loading state forever
    document.querySelector('#paypal-button-container').innerHTML = `
        <div class="loading-state">
            Processing... (simulated hang)
        </div>
    `;
});