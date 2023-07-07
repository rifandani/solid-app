import { Icon } from '@iconify-icon/solid';
import { ParentComponent, Suspense } from 'solid-js';

const SuspenseWithFallbackSpinner: ParentComponent = (props) => (
  <Suspense
    fallback={
      <div class="flex items-center justify-center py-16">
        <Icon icon="svg-spinners:3-dots-fade" height="5em" class="text-primary-content" />
      </div>
    }
  >
    {props.children}
  </Suspense>
);

export default SuspenseWithFallbackSpinner;
