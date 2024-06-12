<!--

# OpenHW Project Concept and Project Launch Markdown Template: Instructions

This template is divided into two parts:
- The Project Concept (PC) required fields are shown in the first part.
- The additional Project Launch (PL) required and optional fields are shown in the second part.

Delete any sections not needed for your proposal

The normal proposal flow is:

- The PC proposal is prepared and presented to TWG. The PC proposal introduces
  the project and explains the market drivers and the "why"
  - TWG grants PC gate with feedback, or rejects PC gate with feedback
  - If PC is granted, additional work is carried out to prepare the PL proposal.
- The PL proposal contains updates to the PC fields and adds additional fields.
  The PL proposal explains the "what" of the project.
  - For software porting projects, the PL should contain the feature list
  - For IP core or other complex projects, the PL should contain a high level
    feature list (the user manual with feature specification is developed for
    the Plan Approved gate).

-->

# CVW Architecture Verification

# Project Concept Proposal

## Date of proposal - 2024-06-24

## Author(s) - Huda Sajjad

## High Level Summary of project, project components, and deliverables

The goal of this project is to create an open and reusable DV Plan and set of coverpoints and tests for architecture functional verification of RISC-V cores through the CVW Core (RVA22S64)

- Creating an Open-source Environment to connect RVVI with Imperas Functional Coverpoints class
- Produce new SystemVerilog cover groups and assembly-language directed tests to cover 100% of the RVA22S64 features not presently covered  by riscvISACOV
- Identify and Cover any gaps present in RISCV Arch tests to achieve full coverage closure

## Summary of market or input requirements

TBD

### Known market/project requirements at PC gate

N/A

### Potential future enhancements

- Work on microarchitecture verification
- Make advancements for the environment to be genreic i.e. it can be used for any core not sepcifically RVA22S64

## Who would make use of OpenHW output

- Any RISCV core cas it needs to ensure that the feature it implements matches the architectural specification. 

## Initial Estimate of Timeline

Project Completion by the end of year 2024

## Explanation of why OpenHW should do this project

- Improve CVA6 performance without impacting too much power/area.

## Industry landscape: description of competing, alternative, or related efforts in the industry

- Imperas riscvISACOV
- RiscV ACTs

## OpenHW Members/Participants committed to participate

- 10xEngineers

## Project Leader(s)

### Technical Project Leader(s)

- Fatima Saleem, 10xEngineers

### Project Manager, if a PM is designated

- Fatima Saleem, 10xEngineers

## Next steps/Investigation towards Project Launch (**PC only**)

- N/A

## Target Date for PL

- N/A
