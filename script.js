document.getElementById("contactForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    // Réinitialiser les erreurs
    document.querySelectorAll(".error").forEach(el => el.textContent = "");
    
    // Récupérer les données
    const prenom = document.getElementById("prenom").value;
    const nom = document.getElementById("nom").value;
    const telephone = document.getElementById("telephone").value;
    const email = document.getElementById("email").value;
    
    // Validation
    let isValid = true;
    if (prenom.length < 2) {
        document.getElementById("prenomError").textContent = "Le prénom est trop court !";
        isValid = false;
    }
    if (nom.length < 2) {
        document.getElementById("nomError").textContent = "Le nom est trop court !";
        isValid = false;
    }
    if (telephone.length < 8) {
        document.getElementById("telephoneError").textContent = "Numéro invalide !";
        isValid = false;
    }
    if (!email.includes("@")) {
        document.getElementById("emailError").textContent = "Email invalide !";
        isValid = false;
    }
    
    // Envoi au backend si valide
    if (isValid) {
        try {
            const response = await fetch("https://formulaire-back-v12y.onrender.com/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prenom, nom, telephone, email })
            });
            
            if (response.ok) {
                document.getElementById("message").textContent = "Merci ! Données enregistrées.";
                document.getElementById("contactForm").reset();
            } else {
                throw new Error("Erreur du serveur");
            }
        } catch (error) {
            document.getElementById("message").textContent = "Erreur : " + error.message;
        }
    }
});
