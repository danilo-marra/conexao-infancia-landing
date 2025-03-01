document.addEventListener('DOMContentLoaded', function() {
  // Flag para controlar animações durante navegação programática
  let isScrolling = false;
  
  // Aplica animações imediatas apenas para elementos visíveis inicialmente
  const elementsToAnimate = document.querySelectorAll('.card, .pricing-box, h2');
  
  // Função para verificar se um elemento está visível na viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }
  
  // Anima elementos visíveis inicialmente
  elementsToAnimate.forEach(element => {
    if (isInViewport(element)) {
      setTimeout(() => {
        element.classList.add('visible');
      }, Math.random() * 300);
    }
  });
  
  // Verifica elementos enquanto usuário rola naturalmente (não por navegação)
  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      elementsToAnimate.forEach(element => {
        if (isInViewport(element) && !element.classList.contains('visible')) {
          element.classList.add('visible');
        }
      });
    }
  });
  
  // Ativa o scroll suave para links de navegação
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        isScrolling = true;
        
        // Anima elementos da seção de destino imediatamente
        const targetSection = targetElement.closest('section');
        if (targetSection) {
          targetSection.querySelectorAll('.card, .pricing-box, h2').forEach(element => {
            element.classList.add('visible');
          });
        }
        
        // Fecha o menu mobile se estiver aberto
        const navbarCollapse = document.querySelector('.navbar-collapse.show');
        if (navbarCollapse) {
          navbarCollapse.classList.remove('show');
        }
        
        // Rolagem suave
        window.scrollTo({
          top: targetElement.offsetTop - 75,
          behavior: 'smooth'
        });
        
        // Restaura flag após a animação
        setTimeout(() => {
          isScrolling = false;
        }, 800);
      }
    });
  });
  
  // Ativa o tooltip do Bootstrap se existir
  if (typeof bootstrap !== 'undefined') {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  }
});

