<template>
  <div class="container mx-auto px-4 py-8">
    <div class="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg shadow-lg p-6 mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">Website Launch Guide</h1>
      <p class="text-lg text-white">Follow these steps to launch your website using GitHub Pages.</p>
    </div>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <FeatureCard
        icon="fa-solid fa-folder-open"
        title="Organize Files"
        description="Ensure all necessary files (HTML, CSS, JavaScript, assets) are in a dedicated folder on your local machine."
      />
      <FeatureCard
        icon="fa-brands fa-github"
        title="GitHub Account"
        description="Sign up for a GitHub account if you haven't already. It's a platform for hosting your code repositories."
      />
      <FeatureCard
        icon="fa-solid fa-plus-square"
        title="Create Repository"
        description="Create a new repository on GitHub. Give it a meaningful name that reflects your website."
      />
      <FeatureCard
        icon="fa-solid fa-upload"
        title="Upload Files"
        description="Upload your website files directly to the repository. Use drag & drop if not all files were uploaded."
      />
      <FeatureCard
        icon="fa-solid fa-code-commit"
        title="Commit Changes"
        description="Commit your changes to the repository with a meaningful message describing the changes."
      />
      <FeatureCard
        icon="fa-solid fa-cog"
        title="Configure Settings"
        description="Go to repository Settings, scroll to GitHub Pages section, select the branch containing your files, and save."
      />
      <FeatureCard
        icon="fa-solid fa-hourglass-half"
        title="Wait for Deployment"
        description="Allow a few minutes for GitHub Pages to deploy your website. You'll see a message when it's live."
      />
      <FeatureCard
        icon="fa-solid fa-globe"
        title="Access Website"
        description="Click the provided URL to access your newly hosted website and ensure everything looks as expected."
      />
    </div>

    <div class="mt-8 bg-blue-50 rounded-lg shadow-lg p-6">
      <h2 class="text-xl font-semibold text-blue-800 mb-2">Need More Help?</h2>
      <p class="text-blue-600 mb-4">
        If you have questions about editing your page, check out our detailed editor guide!
      </p>
      <router-link to="/features-guide" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Read Editor Guide
      </router-link>
    </div>
  </div>
</template>

<script>
import FeatureCard from '@/components/utils/feature_card.vue';

export default {
  components: {
    FeatureCard
  }
};
</script>

<style scoped>
</style>