export function patchState(setter, name, value) {
  setter((current) => ({ ...current, [name]: value }));
}
