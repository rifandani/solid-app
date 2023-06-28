import { ParentComponent, Suspense } from 'solid-js';
import { LoadingSpinner } from '../../atoms';

const SuspenseWithFallbackSpinner: ParentComponent = (props) => (
  <Suspense
    fallback={
      <div class="flex items-center justify-center py-16">
        <LoadingSpinner />
      </div>
    }
  >
    {props.children}
  </Suspense>
);

export default SuspenseWithFallbackSpinner;
