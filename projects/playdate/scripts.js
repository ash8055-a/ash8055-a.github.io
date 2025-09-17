// scripts.js

// =======================
// Version stages
// =======================
const versionStages = {
  experimental: {
    title: "🚧 EXPERIMENTAL 🚧",
    description: "Just been created and is being rapidly updated.",
    showWarning: true,
  },
  heavyAlpha: {
    title: "⚠️ HEAVY ALPHA ⚠️",
    description: "More complete but still being updated rapidly. Transition from experimental to alpha.",
    showWarning: true,
  },
  alpha: {
    title: "🛠️ ALPHA 🛠️",
    description: "Completed transition from experimental to alpha and being updated less rapidly.",
    showWarning: true,
  },
  heavyBeta: {
    title: "⚡ HEAVY BETA ⚡",
    description: "Transition from alpha to beta. Updates become rapid again.",
    showWarning: true,
  },
  beta: {
    title: "✅ BETA ✅",
    description: "Transition from alpha to beta complete. Updates slow down more significantly than alpha. Warning page will be replaced with a small header.",
    showWarning: "header", // special case: banner header, not full stop page
  },
  done: {
    title: "🎉 DONE 🎉",
    description: "No warnings of any form will appear.",
    showWarning: false,
  }
};

// =======================
// Pick current stage here
// =======================
const currentStage = versionStages.heavyAlpha; 
// Change to .heavyAlpha, .alpha, .heavyBeta, .beta, or .done when needed

// =======================
// Logic
// =======================
document.addEventListener("DOMContentLoaded", () => {
  if (currentStage.showWarning === true) {
    // Full warning page
    const stageTitle = document.getElementById("stageTitle");
    const stageDesc = document.getElementById("stageDesc");
    const continueBtn = document.getElementById("continueBtn");

    if (stageTitle) stageTitle.textContent = currentStage.title;
    if (stageDesc) stageDesc.textContent = currentStage.description;

    if (continueBtn) {
      continueBtn.addEventListener("click", () => {
        window.location.href = "home.html"; // redirect after continue
      });
    }
  } else if (currentStage.showWarning === "header") {
    // Insert banner header at top of page
    const banner = document.createElement("div");
    banner.classList.add("warning-banner");
    banner.innerHTML = `<strong>${currentStage.title}</strong> - ${currentStage.description}`;
    document.body.prepend(banner);
  } else {
    // No warning at all
    console.log("Stage DONE: No warnings displayed.");
  }
});
