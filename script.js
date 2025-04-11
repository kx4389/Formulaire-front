document.getElementById("contactForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    // Reset des messages
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    const serverMsg = document.getElementById("serverMessage");
    serverMsg.className = "server-response";
    serverMsg.textContent = '';

    // Récupération des données
    const formData = {
        prenom: document.getElementById("prenom").value.trim(),
        nom: document.getElementById("nom").value.trim(),
        telephone: document.getElementById("telephone").value.trim(),
        email: document.getElementById("email").value.trim()
    };

    // Validation côté client
    let isValid = true;
    
    if (formData.prenom.length < 2) {
        document.getElementById("prenomError").textContent = "Minimum 2 caractères";
        isValid = false;
    }
    
    if (!/^\+?[\d\s]{10,15}$/.test(formData.telephone)) {
        document.getElementById("telephoneError").textContent = "Format invalide";
        isValid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        document.getElementById("emailError").textContent = "Email invalide";
        isValid = false;
    }

    if (!isValid) return;

    // Envoi au serveur
    try {
        const response = await fetch("https://votre-api.onrender.com/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Erreur serveur");
        }

        // Succès
        serverMsg.className = "server-response success";
        serverMsg.textContent = "Message envoyé avec succès!";
        document.getElementById("contactForm").reset();

    } catch (error) {
        console.error("Erreur:", error);
        serverMsg.className = "server-response error";
        serverMsg.textContent = error.message || "Erreur de connexion au serveur";
    }
});
