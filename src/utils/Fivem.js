export const playVideo = () => {
  fetch(`https://${GetParentResourceName()}/playVideo`, { method: "POST" });
};

export const closeUI = () => {
  fetch(`https://${GetParentResourceName()}/closeUI`, { method: "POST" });
};
