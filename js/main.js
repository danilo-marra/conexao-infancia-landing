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
  
  // Versão otimizada da animação de elementos
  const animateElements = document.querySelectorAll('.card, .pricing-box, h2');
  
  // Usa IntersectionObserver para detectar quando elementos entram na viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Adiciona a classe apenas quando o elemento entra em vista
      if (entry.isIntersecting && !entry.target.classList.contains('animate-in')) {
        // Pequeno atraso para evitar animações simultâneas
        setTimeout(() => {
          entry.target.classList.add('animate-in');
        }, 50);
      }
    });
  }, {
    root: null, // viewport
    threshold: 0.1, // 10% do elemento visível
    rootMargin: '-50px' // margem negativa para animar um pouco antes
  });
  
  // Observa todos os elementos que queremos animar
  animateElements.forEach(element => {
    observer.observe(element);
  });
});