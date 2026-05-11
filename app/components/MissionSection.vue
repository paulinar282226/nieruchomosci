<template>
  <section class="mission-wrap section">
    <div class="container">
      <div class="mission-head">
        <p class="mission-kicker">Dlaczego my</p>
        <h2 class="mission-title">
          Przestrzeń, gdzie każda decyzja
          <span>o nieruchomości</span> jest prostsza.
        </h2>
      </div>

      <div class="columns is-variable is-5">
        <div class="column is-4-desktop">
          <article class="mission-card">
            <div class="mission-icon">🔎</div>
            <h3>Tu znajdziesz</h3>
            <p>
              Filtruj oferty po cenie, metrażu i lokalizacji. Otrzymujesz
              konkretne wyniki bez chaosu.
            </p>
          </article>
        </div>

        <div class="column is-4-desktop">
          <article class="mission-card">
            <div class="mission-icon">🏷️</div>
            <h3>Tu sprzedasz</h3>
            <p>
              Dodawaj i promuj ogłoszenia w miejscu, które codziennie odwiedzają
              osoby realnie szukające domu.
            </p>
          </article>
        </div>

        <div class="column is-4-desktop">
          <article class="mission-card">
            <div class="mission-icon">🔑</div>
            <h3>Tu wynajmiesz</h3>
            <p>
              Od kawalerki po dom rodzinny. Wybierasz tempo i model wynajmu,
              a my pomagamy domknąć proces.
            </p>
          </article>
        </div>
      </div>

      <div class="mission-cta">
        <p>
          Gotowy na kolejny krok?
          <span>Przejrzyj najnowsze oferty i zapisz ulubione.</span>
        </p>
        <NuxtLink to="/szukaj" class="button mission-button">Przejdź do wyszukiwania</NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.mission-wrap {
  background:
    radial-gradient(circle at 90% 8%, rgba(232, 196, 196, 0.35), transparent 38%),
    linear-gradient(180deg, #ffffff 0%, #fff8f8 100%);
}

.mission-head {
  max-width: 760px;
  margin-bottom: 1.75rem;
}

.mission-kicker {
  display: inline-block;
  margin-bottom: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.7rem;
  font-weight: 700;
  color: #b87272;
}

.mission-title {
  color: #4a3b3b;
  line-height: 1.18;
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-weight: 800;

  span {
    color: #c48484;
  }
}

.mission-card {
  background: #fff;
  border: 1px solid #f1dede;
  border-radius: 18px;
  padding: 1.2rem;
  min-height: 220px;
  box-shadow: 0 14px 30px rgba(120, 70, 70, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  h3 {
    color: #4a3b3b;
    font-weight: 800;
    margin-bottom: 0.5rem;
  }

  p {
    color: #746161;
    line-height: 1.55;
    font-size: 0.96rem;
  }
}

.mission-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 35px rgba(120, 70, 70, 0.14);
}

.mission-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: #fff1f1;
  display: grid;
  place-items: center;
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
}

.mission-cta {
  margin-top: 1.8rem;
  border-radius: 16px;
  background: linear-gradient(130deg, #ba7777, #d49a9a);
  color: #fff;
  padding: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  p {
    margin: 0;
    font-weight: 700;
  }

  span {
    display: block;
    opacity: 0.9;
    font-weight: 500;
    margin-top: 0.25rem;
  }
}

.mission-button {
  border: none;
  background: #fff;
  color: #a76464;
  font-weight: 800;
  border-radius: 11px;
}

@media (max-width: 768px) {
  .mission-cta {
    display: block;
  }

  .mission-button {
    margin-top: 0.9rem;
    width: 100%;
  }
}
</style>
