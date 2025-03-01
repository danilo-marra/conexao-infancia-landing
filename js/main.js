document.addEventListener('DOMContentLoaded', function() {
  // Ativa o scroll suave para links de navegação
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 75,
          behavior: 'smooth'
        });
        
        // Fecha o menu mobile se estiver aberto
        const navbarCollapse = document.querySelector('.navbar-collapse.show');
        if (navbarCollapse) {
          navbarCollapse.classList.remove('show');
        }
      }
    });
  });
  
  // Animação de elementos quando ficam visíveis
  function animateOnScroll() {
    const elements = document.querySelectorAll('.card, .pricing-box, h2');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (elementPosition < screenPosition) {
        element.classList.add('animate-in');
      }
    });
  }
  
  // Inicializa a animação e adiciona evento de scroll
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);
});