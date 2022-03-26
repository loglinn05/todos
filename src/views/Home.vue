<template>
  <div class="home col-xl-6 col-md-8 col-12">
    <h1>Welcome Home!</h1>
    <p>This is a to-do list app. It will: </p>
    <ul>
      <li><p>help you arrange your day and stay organized;</p></li>
      <li><p>keep you focused;</p></li>
      <li><p>increase your productivity;</p></li>
      <li><p>be a good motivator;</p></li>
      <li><p>help you save your time for important things and creative thoughts.</p></li>
    </ul>
    <my-button
      :another-classes="['action-button', 'mb-3']"
      :outline="true"
      data-mdb-ripple-color="dark"
      @click="$router.push('/todos')"
    >Create Your To-Do List</my-button>
    <p>Here are some interesting articles about to-do lists. Enjoy!</p>
    <ul>
      <li>
        <a
          target="_blank"
          href="https://www.theguardian.com/lifeandstyle/2017/may/10/the-psychology-of-the-to-do-list-why-your-brain-loves-ordered-tasks"
        >
          The psychology of the to-do list – why your brain loves ordered tasks
        </a>
      </li>
      <li>
        <a
          target="_blank"
          href="https://sendtask.io/blog/why-you-should-have-a-to-do-list/"
        >
          Why you should have a to-do list
        </a>
      </li>
      <li>
        <a
          target="_blank"
          href="https://www.spica.com/blog/how-to-organize-a-to-do-list"
        >
          The to-do list: how to use to-do lists in the most productive way
        </a>
      </li>
      <li>
        <a
          target="_blank"
          href="https://hbr.org/2020/08/your-to-do-list-is-in-fact-too-long"
        >
          Your to-do list is, in fact, too long
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style>
.home {
  display: inline-flex;
  flex-direction: column;
  text-align: justify;
  padding: 2em;
}

.home h1 {
  text-align: center;
}

.home .action-button {
  align-self: center;
}

@media screen and (max-width: 450px) {
  .home {
    padding: 1em 0.5em 1em 0.5em;
  }
}
</style>