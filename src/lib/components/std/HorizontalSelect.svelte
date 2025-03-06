<script lang="ts">
    let {
        options,
        selected = $bindable(),
    } = $props();

    function selectOption(option: string) {
        selected = option;
    }

    const fixCasing = (s: string) => {
        console.debug("Hello")
        return s.toLowerCase().charAt(0).toUpperCase() + s.slice(1);
    }
</script>

<div class="button-group">
  {#each options as option}
    <button
      class:active={selected === option}
      onclick={() => selectOption(option)}
      type="button"
    >
      {option.charAt(0).toUpperCase()+option.slice(1).toLowerCase()}
    </button>
  {/each}
</div>

<style>
  .button-group {
    display: flex;
    background: #f0f0f0;
    border-radius: 8px;
    position: relative;
    height: var(--height-input-md);
  }

  button {
    flex: 1;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 14px;
    position: relative;
    z-index: 1;
    color: #555;
    border-radius: 6px;
    margin: 2px;
  }

  button.active {
    background: white;
    color: var(--clr-text-def);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  }
</style>